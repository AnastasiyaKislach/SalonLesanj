using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SalonLesanj.Entities {
	public class Dress {
		public int Id { get; set; }

		[Required]
		[MaxLength(1024)]
		public string ImageUrl1 { get; set; }

		[MaxLength(1024)]
		public string ImageUrl2 { get; set; }

		[MaxLength(1024)]
		public string ImageUrl3 { get; set; }

		[Required]
		[MaxLength(1024)]
		public string Title { get; set; }

		[MaxLength(2048)]
		public string Description { get; set; }

		public int BrandId { get; set; }
		public virtual Brand Brand { get; set; }

		public virtual List<Appointment> Appointments { get; set; }
		public Dress() {
			Appointments = new List<Appointment>();
		}
	}
}
