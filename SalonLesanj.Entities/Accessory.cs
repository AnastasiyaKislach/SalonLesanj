using System.ComponentModel.DataAnnotations;

namespace SalonLesanj.Entities {
	public class Accessory {
		public int Id { get; set; }

		[Required]
		[MaxLength(1024)]
		public string Title { get; set; }

		[Required]
		[MaxLength(1024)]
		public string ImageUrl { get; set; }

		[MaxLength(2048)]
		public string Description { get; set; }

		public int KindId { get; set; }

		public virtual Kind Kind { get; set; }
	}
}
