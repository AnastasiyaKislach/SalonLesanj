using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SalonLesanj.Entities {
	public class Brand {
		public int Id { get; set; }

		[Required]
		[MaxLength(1024)]
		public string Title { get; set; }

		[Required]
		[MaxLength(1024)]
		public string ImageUrl { get; set; }

		public virtual List<Dress> Dresses { get; set; }

		public Brand() {
			Dresses = new List<Dress>();
		}

	}
}
