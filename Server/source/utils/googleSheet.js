import { google } from "googleapis";
import path from "path";

const auth = new google.auth.GoogleAuth({
    keyFile: path.resolve("credentials.json"),
    scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = "1kLWxlQNOPLvHRZiXmWsB1SpzjSYuyfqUZnhdFpYlCdg";
const RANGE = "Sheet1!A:I";

export const appendToSheet = async ({
    deviceId = "NaN",
    temp = "NaN",
    turb = "NaN",
    do_val = "NaN",
    tds = "NaN",
    ec = "NaN",
    ph = "NaN"
}) => {
    const now = new Date();

    const row = [
        now.toISOString().split("T")[0],
        now.toTimeString().split(" ")[0],
        deviceId,
        do_val,
        ec,
        tds,
        turb,
        temp,
        ph
    ];

    await sheets.spreadsheets.values.append({
        spreadsheetId: SPREADSHEET_ID,
        range: RANGE,
        valueInputOption: "USER_ENTERED",
        requestBody: {
            values: [row],
        },
    });
};
