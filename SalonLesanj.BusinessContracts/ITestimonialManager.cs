using SalonLesanj.Entities;
using System.Linq;

namespace SalonLesanj.BusinessContracts {
	public interface ITestimonialManager : IDataManager<Testimonial> {
		IQueryable<Testimonial> GetAllApproved();
	}
}
