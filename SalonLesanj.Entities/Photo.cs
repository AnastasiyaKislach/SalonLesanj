using System.ComponentModel.DataAnnotations;

namespace SalonLesanj.Entities {
	public class Photo {
		public int Id { get; set; }

		[Required]
		[MaxLength(1024)]
		public string Author { get; set; }

		[Required]
		[MaxLength(1024)]
		public string ImageUrl { get; set; }

	}
}
