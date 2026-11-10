GTV ULTRA — UK Customer Help Centre and Netlify Portal

This project contains UK-focused device setup and troubleshooting content,
a searchable help library, customer ticket submission and lookup, staff ticket
management, and a manually published service-status page.

SEO checklist before launch:
1. Connect your real custom domain in Netlify.
2. Replace no domain placeholders until the domain is confirmed.
3. Verify the domain in Google Search Console.
4. Submit sitemap.xml after replacing YOUR_DOMAIN with the real HTTPS domain.
5. Confirm pages are indexable and that Netlify deploys the public folder.
6. Add genuine organisation details and support policies only where accurate.
7. Keep page titles and descriptions unique if you later split this into multiple URLs.

Backend setup remains the same:
- Create a Supabase project and run supabase-schema.sql.
- Configure SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY and ADMIN_USER_ID in Netlify.
- Set GTV_SUPABASE_URL and GTV_SUPABASE_ANON_KEY in public/index.html.
- Deploy and test customer ticket submission, ticket lookup and staff dashboard.

Important: The public status page is manually updated by staff, not an automatic
uptime monitor. Ticket email notifications and anti-spam/CAPTCHA protection
are not included yet. Do not promise response times unless they are operationally
supported. This website does not claim to provide legal advice or guarantee
compatibility with every device or network.


SEO CONTENT PAGES ADDED
- /firestick-setup/
- /android-tv-setup/
- /buffering-help/
- /no-signal-help/
- /login-help/
- /app-installation/

Each page has unique UK-English page metadata, useful original instructions, internal links and FAQ structured data.
IMPORTANT BEFORE LAUNCH
1. Connect your real domain to Netlify.
2. Replace YOUR-DOMAIN.example in public/sitemap-template.xml and public/robots.txt with your real domain.
3. Rename sitemap-template.xml to sitemap.xml after replacing the placeholder.
4. Submit https://YOUR-REAL-DOMAIN/sitemap.xml in Google Search Console.
5. Confirm each page is publicly accessible and not blocked from indexing.
6. Do not expect instant rankings or trending status. Search visibility depends on quality, competition, site performance, genuine mentions/links and ongoing useful updates.
7. Review all business, legal, pricing, app-download and support details before launch.
8. Configure Supabase and Netlify environment variables before advertising the ticket form. Ticketing is not live until backend configuration and deployment are complete.

GTV ULTRA IPHONE ADMIN APP — SETUP

WHAT THIS APP DOES
- Private staff sign-in using Supabase Auth.
- View customer support tickets.
- Search tickets and filter by status.
- Reply to tickets and change their status.
- View customer feedback and 1–5 star ratings.
- Install on iPhone Home Screen as a web app.

BEFORE IT CAN SHOW REAL RECORDS
1. Deploy the FULL SOURCE project, not only the static public folder. Netlify Functions are required.
2. In Supabase SQL Editor, run the project's updated supabase-schema.sql. This creates the support ticket and feedback tables.
3. In Supabase Authentication, create the staff/admin user who will sign in.
4. In Netlify Site configuration > Environment variables, set:
   SUPABASE_URL = your Supabase project URL
   SUPABASE_SERVICE_ROLE_KEY = your Supabase service_role key (server-side only)
   ADMIN_USER_ID = the UUID of the authorised admin user from Supabase Auth
5. Edit public/admin-app/config.js and replace:
   YOUR_SUPABASE_PROJECT_URL
   YOUR_SUPABASE_ANON_PUBLIC_KEY
   with the Supabase Project URL and anon/public key.
   NEVER put the service_role key in config.js or any browser file.
6. Redeploy the site.
7. Open https://YOUR-DOMAIN/admin-app/ on your iPhone and sign in.

INSTALL ON IPHONE
1. Open the admin-app URL in Safari.
2. Tap the Share icon.
3. Choose Add to Home Screen.
4. Name it GTV Admin and tap Add.
5. Open the new GTV Admin icon from your Home Screen.

SECURITY
- Only the Supabase user whose UUID matches ADMIN_USER_ID can access admin API data.
- Keep your admin password private and use a strong unique password.
- Do not share the service_role key.
- This is an installable web app (PWA), not an App Store native app.
- Push notifications are not included in this first version; open the app and tap Refresh to check for new records.
- Ticket replies/status updates are saved to the database. Emailing the customer is not configured by this app.
