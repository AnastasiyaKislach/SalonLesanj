using System.Collections.Generic;
using SalonLesanj.Entities;

namespace SalonLesanj.BusinessContracts {
	public interface IAppointmentManager : IDataManager<Appointment> {
		Appointment Add(Appointment appointment, IEnumerable<int> dresses);
	}
}
