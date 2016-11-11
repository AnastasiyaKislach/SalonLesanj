using Ninject.Modules;
using SalonLesanj.BLL;
using SalonLesanj.BusinessContracts;

namespace  SalonLesanj.DependencyResolver{
	public class BusinessModule : NinjectModule
	{
		public override void Load()
		{
			Bind<INewsManager>().To<NewsManager>();
			Bind<IBrandManager>().To<BrandManager>();
			Bind<IDressManager>().To<DressManager>();
			Bind<IKindManager>().To<KindManager>();
			Bind<IAccessoryManager>().To<AccessoryManager>();
			Bind<IAppointmentManager>().To<AppointmentManager>();
			Bind<IFeedBackManager>().To<FeedBackManager>();
			Bind<ISettingsManager>().To<SettingsManager>();
		}
	}
}