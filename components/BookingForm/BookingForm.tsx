'use client';

import { useFormik } from 'formik';
import { createBookingRequest } from '@/lib/api/cars';
import css from './BookingForm.module.css';

type BookingFormProps = {
  carId: string;
};

export default function BookingForm({ carId }: BookingFormProps) {
  const formik = useFormik({
    initialValues: { name: '', email: '', comment: '' },
    validate: (values) => {
      const errors: { name?: string; email?: string; comment?: string } = {};

      if (values.name.trim() === '') {
        errors.name = 'Please enter your name.';
      } else if (/\d/.test(values.name)) {
        errors.name = 'Name must not contain numbers.';
      }
      if (values.email.trim() === '') {
        errors.email = 'Please enter your email.';
      } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email.trim())) {
        errors.email = 'Please enter a valid email.';
      }
      if (values.comment.trim() === '') {
        errors.comment = 'Comment is required';
      }
      return errors;
    },
    onSubmit: async (values, { resetForm }) => {
      try {
        const result = await createBookingRequest(carId, values);
        alert(result.message);
        resetForm();
      } catch {
        alert('Failed to submit your request. Please try again.');
      }
    },
  });

  return (
    <section className={css.card}>
      <h2>Book your car now</h2>
      <p className={css.subtitle}>Stay connected! We are always ready to help you.</p>
      <form className={css.form} onSubmit={formik.handleSubmit} noValidate>
        <div>
          <label htmlFor="name">Name*</label>
          <input
            className={css.input}
            id="name"
            name="name"
            type="text"
            autoComplete="name"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && (
            <p className={css.errorText}>{formik.errors.name}</p>
          )}
        </div>
        <div>
          <label htmlFor="email">Email*</label>
          <input
            className={css.input}
            id="email"
            name="email"
            type="email"
            autoComplete="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && (
            <p className={css.errorText}>{formik.errors.email}</p>
          )}
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <textarea
            className={css.input}
            id="comment"
            name="comment"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.comment}
          />
          {formik.touched.comment && formik.errors.comment && (
            <p className={css.errorText}>{formik.errors.comment}</p>
          )}
        </div>
        <button className="button" type="submit" disabled={formik.isSubmitting}>
          {formik.isSubmitting ? 'Sending...' : 'Send'}
        </button>
      </form>
    </section>
  );
}
