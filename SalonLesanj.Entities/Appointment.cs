using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;

namespace SalonLesanj.Entities {
	public class Appointment {
		public int Id { get; set; }

		[Required]
		[MaxLength(1024)]
		public string Name { get; set; }

		[Required]
		[MaxLength(1024)]
		public string Phone { get; set; }

		[Required]
		public DateTime Date { get; set; }

		[MaxLength(2048)]
		public string Details { get; set; }

		public bool IsApprove { get; set; }

		public virtual List<Dress> Dresses { get; set; }

		public Appointment() {
			Dresses = new List<Dress>();
		}
	}
}
