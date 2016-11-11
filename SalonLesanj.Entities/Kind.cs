using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SalonLesanj.Entities {
	public class Kind {

		public int Id { get; set; }

		[Required]
		[MaxLength(1024)]
		public string Title { get; set; }

		[Required]
		[MaxLength(1024)]
		public string TitleRus { get; set; }

		public virtual List<Accessory> Accessories { get; set; }

		public Kind() {
			Accessories = new List<Accessory>();
		}
	}
}
