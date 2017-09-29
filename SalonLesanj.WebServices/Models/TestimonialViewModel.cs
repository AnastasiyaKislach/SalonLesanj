using System;
using SalonLesanj.Entities;

namespace SalonLesanj.WebServices.Models {
	public class TestimonialViewModel {
		public int Id { get; set; }

		public string Author { get; set; }

		public string Email { get; set; }

		public string ImageUrl { get; set; }

		public string Text { get; set; }

		public DateTime CreationTime { get; set; }

		public bool IsApproved { get; set; }

		public TestimonialViewModel() {
		}

		public TestimonialViewModel(Testimonial testimonial) {
			Id = testimonial.Id;
			Author = testimonial.Author;
			Email = testimonial.Email;
			ImageUrl = testimonial.ImageUrl;
			Text = testimonial.Text;
			CreationTime = testimonial.CreationTime;
			IsApproved = testimonial.IsApproved;
		}

	}
}