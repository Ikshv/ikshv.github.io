import React, { useMemo } from 'react';
import ExperienceCard from '../components/ExperienceCard';
import { motion } from 'framer-motion';
import { useEmploymentPositions } from '../hooks/useEmploymentPositions';

function Experiences() {
  const { rows, loading, error } = useEmploymentPositions({ includeDrafts: false });

  const experiences = useMemo(
    () =>
      rows.map((row) => ({
        id: row.id,
        jobTitle: row.job_title,
        companyName: row.company_name,
        startDate: row.start_date,
        endDate: row.end_date ?? '',
        description: row.description,
        projects: (Array.isArray(row.projects) ? row.projects : []).filter(
          (p) => p.show_on_site !== false
        ),
      })),
    [rows]
  );

  return (
    <section id="experience" className="max-w-5xl mx-auto px-6 py-2 text-white">
      <h2 className="text-4xl font-bold mb-10 text-center">Experience</h2>

      {loading && (
        <p className="text-center text-gray-400">Loading experience…</p>
      )}
      {!loading && error && (
        <p className="text-center text-red-300 text-sm max-w-lg mx-auto">
          Could not load experience ({error}). Add the{' '}
          <code className="text-gray-200">employment_positions</code> table in Supabase and optional
          seed, then refresh.
        </p>
      )}
      {!loading && !error && experiences.length === 0 && (
        <p className="text-center text-gray-400">
          No experience entries yet. Add rows in Supabase or run the optional seed SQL.
        </p>
      )}

      <div className="space-y-8">
        {experiences.map((exp, i) => (
          <motion.div
            key={exp.id}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: i * 0.2 }}
          >
            <ExperienceCard {...exp} />
          </motion.div>
        ))}
      </div>
    </section>
  );
}

export default Experiences;
