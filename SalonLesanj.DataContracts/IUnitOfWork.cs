using SalonLesanj.Entities;
using System;

namespace SalonLesanj.DataContracts {
	public interface IUnitOfWork : IDisposable {
		IRepository<News> News { get; }
		IRepository<Brand> Brands { get; }
		IRepository<Kind> Kinds { get; }
		IRepository<Dress> Dresses { get; }
		IRepository<Accessory> Accessories { get; }
		IRepository<Appointment> Appointments { get; }
		IRepository<Setting> Settings { get; }
		IRepository<Testimonial> Testimonials { get; }
		IRepository<Photo> Photos { get; }

		IRepository<T> GetRepository<T>();
		
	}
}
