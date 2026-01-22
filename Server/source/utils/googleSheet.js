import { google } from "googleapis";

const auth = new google.auth.GoogleAuth({
  credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_JSON),
  scopes: ["https://www.googleapis.com/auth/spreadsheets"],
});

const sheets = google.sheets({ version: "v4", auth });

const SPREADSHEET_ID = "1kLWxlQNOPLvHRZiXmWsB1SpzjSYuyfqUZnhdFpYlCdg";
const RANGE = "Sheet1!A:I";

export const appendToSheet = async ({
  deviceId,
  temp,
  turb,
  do_val,
  tds,
}) => {
  try {
    const now = new Date();

    const row = [
      now.toISOString().split("T")[0],      // Date (UTC)
      now.toTimeString().split(" ")[0],     // Time
      deviceId,
      do_val,
      "",
      tds,
      turb,
      temp,
      ""
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: { values: [row] },
    });

    console.log("Sheet updated");
  } catch (err) {
    console.error("Sheet update failed:", err.message);
  }
};
