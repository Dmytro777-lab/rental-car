'use client';
import { createBookingRequest } from '@/lib/api/cars';
import { useFormik } from 'formik';

type BookingFormProps = {
  carId: string;
};
export default function BookingForm({ carId }: BookingFormProps) {
  const formik = useFormik({
    initialValues: {
      name: '',
      email: '',
      comment: '',
    },
    validate: (values) => {
      const errors: { name?: string; email?: string; comment?: string } = {};

      if (values.name.trim() === '') {
        errors.name = 'Please enter your name.';
      } else if (/^\d+$/.test(values.name.trim())) {
        errors.name = 'Please enter a valid name.';
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
    <div>
      <h3>Book your car now</h3>
      <p>Stay connected! We are always ready to help you.</p>
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label htmlFor="name">Name</label>
          <input
            id="name"
            name="name"
            type="text"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.name}
          />
          {formik.touched.name && formik.errors.name && <p>{formik.errors.name}</p>}
        </div>
        <div>
          <label htmlFor="email">Email</label>
          <input
            id="email"
            name="email"
            type="email"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.email}
          />
          {formik.touched.email && formik.errors.email && <p>{formik.errors.email}</p>}
        </div>
        <div>
          <label htmlFor="comment">Comment</label>
          <textarea
            id="comment"
            name="comment"
            onBlur={formik.handleBlur}
            onChange={formik.handleChange}
            value={formik.values.comment}
          />
          {formik.touched.comment && formik.errors.comment && <p>{formik.errors.comment}</p>}
        </div>
        <button type="submit" disabled={formik.isSubmitting}>
          Send
        </button>
      </form>
    </div>
  );
}
