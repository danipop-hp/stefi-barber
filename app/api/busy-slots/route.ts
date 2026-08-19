import { NextResponse } from 'next/server';
import { google } from 'googleapis';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const date = searchParams.get('date'); // Format primit: YYYY-MM-DD

  if (!date) {
    return NextResponse.json({ error: 'Data este obligatorie.' }, { status: 400 });
  }

  const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
  const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
  const calendarId = process.env.GOOGLE_CALENDAR_ID;

  if (!clientEmail || !privateKey || !calendarId) {
    return NextResponse.json({ busySlots: [] });
  }

  try {
    const auth = new google.auth.JWT({
      email: clientEmail,
      key: privateKey,
      scopes: ['https://www.googleapis.com/auth/calendar.readonly'],
    });

    const calendar = google.calendar({ version: 'v3', auth });

    // Căutăm evenimentele din ziua selectată (de la 00:00 la 23:59)
    const timeMin = new Date(`${date}T00:00:00Z`).toISOString();
    const timeMax = new Date(`${date}T23:59:59Z`).toISOString();

    const response = await calendar.events.list({
      calendarId,
      timeMin,
      timeMax,
      singleEvents: true,
      orderBy: 'startTime',
    });

    const events = response.data.items || [];

    // Extragerea orelor de început în format "HH:mm" (ex: "15:00")
    const busySlots = events
      .map((event) => {
        if (!event.start?.dateTime) return null;
        const eventDate = new Date(event.start.dateTime);
        const hours = String(eventDate.getHours()).padStart(2, '0');
        const minutes = String(eventDate.getMinutes()).padStart(2, '0');
        return `${hours}:${minutes}`;
      })
      .filter(Boolean);

    return NextResponse.json({ busySlots });
  } catch (error) {
    console.error('Eroare la citirea orelor ocupate:', error);
    return NextResponse.json({ busySlots: [] });
  }
}