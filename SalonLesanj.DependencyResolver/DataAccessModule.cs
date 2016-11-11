using Ninject.Modules;
using SalonLesanj.DataContracts;
using SalonLesanj.DAL;

namespace SalonLesanj.DependencyResolver
{
	public class DataAccessModule : NinjectModule
	{
		private readonly string connectionString;

		public DataAccessModule(string connectionString)
		{
			this.connectionString = connectionString;
		}

		public override void Load()
		{
			Bind<IUnitOfWork>()
				.To<UnitOfWork>()
				.WithConstructorArgument(connectionString);
		}
	}
}
