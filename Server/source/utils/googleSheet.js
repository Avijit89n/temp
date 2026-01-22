import { google } from "googleapis";

if (!process.env.GOOGLE_SERVICE_ACCOUNT_JSON) {
  throw new Error("GOOGLE_SERVICE_ACCOUNT_JSON is missing");
}

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

    const dateIST = now.toLocaleDateString("en-CA", {
      timeZone: "Asia/Kolkata",
    });

    const timeIST = now.toLocaleTimeString("en-GB", {
      timeZone: "Asia/Kolkata",
      hour12: false,
    });

    const row = [
      dateIST,     // Date (IST)
      timeIST,     // Time (IST)
      deviceId,
      do_val,
      "",           // EC (optional)
      tds,
      turb,
      temp,
      ""            // pH (optional)
    ];

    await sheets.spreadsheets.values.append({
      spreadsheetId: SPREADSHEET_ID,
      range: RANGE,
      valueInputOption: "USER_ENTERED",
      requestBody: {
        values: [row],
      },
    });

    console.log("Sheet updated successfully (IST)");

  } catch (err) {
    console.error("Sheet update failed:", err.message);
  }
};
