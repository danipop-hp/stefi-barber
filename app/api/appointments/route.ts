import { NextResponse } from 'next/server';
import { google } from 'googleapis';
import { Resend } from 'resend';
const resend = new Resend("re_test_123");

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { fullName, phone, service, date, time } = body;

    // Verificăm doar câmpurile de care avem nevoie (fără email de la client)
    if (!fullName || !phone || !service || !date || !time) {
      return NextResponse.json(
        { error: 'Toate câmpurile sunt obligatorii.' },
        { status: 400 }
      );
    }

    // --- Salvare în Google Calendar ---
    const clientEmail = process.env.GOOGLE_CLIENT_EMAIL;
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');
    const calendarId = process.env.GOOGLE_CALENDAR_ID;

    if (clientEmail && privateKey && calendarId) {
      const auth = new google.auth.JWT({
        email: clientEmail,
        key: privateKey,
        scopes: ['https://www.googleapis.com/auth/calendar.events'],
      });

      const calendar = google.calendar({ version: 'v3', auth });
      const startDateTime = new Date(`${date}T${time}:00`);
      const endDateTime = new Date(startDateTime.getTime() + 45 * 60 * 1000);

      await calendar.events.insert({
        calendarId: calendarId,
        requestBody: {
          summary: `Tuns: ${fullName}`,
          description: `Client: ${fullName}\nTelefon: ${phone}\nServiciu: ${service}`,
          start: { dateTime: startDateTime.toISOString(), timeZone: 'Europe/Bucharest' },
          end: { dateTime: endDateTime.toISOString(), timeZone: 'Europe/Bucharest' },
        },
      });
    }

    // --- Notificare pe e-mail către frizer (fără a-i cere emailul clientului) ---
    if (process.env.RESEND_API_KEY && calendarId) {
      await resend.emails.send({
        from: 'Stefi Barber <onboarding@resend.dev>',
        to: calendarId, // Trimite pe mailul asociat calendarului/frizerului
        subject: `🚨 Programare nouă: ${fullName} (${time})`,
        html: `
          <h2>Ai o nouă programare pe site!</h2>
          <p><strong>Client:</strong> ${fullName}</p>
          <p><strong>Telefon:</strong> ${phone}</p>
          <p><strong>Serviciu:</strong> ${service}</p>
          <p><strong>Data:</strong> ${date}</p>
          <p><strong>Ora:</strong> ${time}</p>
        `,
      });
    }

    return NextResponse.json({ success: true });
  } catch (error: any) {
    console.error('Eroare backend:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}