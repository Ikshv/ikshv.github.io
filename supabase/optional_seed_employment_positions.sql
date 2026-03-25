-- OPTIONAL: seed from legacy About / Experience section (run after employment_positions migration).

insert into public.employment_positions (
  sort_order, displayed_on_site, job_title, company_name, start_date, end_date, description, projects
) values
(
  0,
  true,
  'Software Engineer',
  'Bokam Engineering',
  'Jan 2022',
  'Jan 2023',
  'Developed internal applications to streamline calibration workflows and data acquisition pipelines.',
  $p$[
    {
      "name": "Calibration Systems",
      "summary": "Created a React-based app for calibrating JOY mining equipment, replacing paper-based workflows.",
      "technologies": ["React", "JavaScript", "CSS"],
      "highlights": [
        "Enabled 1000+ devices to be calibrated digitally.",
        "Cut processing time by 60%."
      ]
    },
    {
      "name": "Data Pipelines",
      "summary": "Automated telemetry and diagnostic stream processing for vehicular input systems.",
      "technologies": ["Python", "Pandas", "NumPy"],
      "highlights": [
        "Improved error detection during testing.",
        "Interfaced with hardware data streams over CAN."
      ]
    }
  ]$p$::jsonb
),
(
  1,
  true,
  'Data Analyst',
  'Gatekeeper Systems',
  'Jul 2022',
  'Apr 2023',
  'Owned Looker dashboards and backend analytics for subscription services and theft analytics.',
  $p$[
    {
      "name": "Subscription Reporting System",
      "summary": "Managed reporting pipelines for 2000+ retail locations.",
      "technologies": ["SQL", "Looker", "Python"],
      "highlights": [
        "Automated alerts for expiring subscriptions.",
        "Reduced reporting lag by 75%."
      ]
    },
    {
      "name": "Theft & System Analytics",
      "summary": "Created executive dashboards for pushout theft data and device telemetry.",
      "technologies": ["Looker", "Jira", "Python"],
      "highlights": [
        "Helped prioritize engineering fixes with data-driven insights.",
        "Detected 3k+ anomalies from telemetry logs."
      ]
    }
  ]$p$::jsonb
);
