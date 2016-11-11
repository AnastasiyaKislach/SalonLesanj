using System;
using System.ComponentModel.DataAnnotations;

namespace SalonLesanj.Entities {
	public class News {
		public int Id { get; set; }

		[Required]
		[MaxLength(1024)]
		public string Title { get; set; }

		[Required]
		[MaxLength(1024)]
		public string ImageUrl { get; set; }

		[Required]
		[MaxLength(2048)]
		public string Content { get; set; }

		public DateTime Date { get; set; }
	}
}
