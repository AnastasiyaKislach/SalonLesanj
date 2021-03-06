﻿using System.Web.Http.Dependencies;
using Ninject;

namespace SalonLesanj.DependencyResolver
{
	public class NinjectDependencyResolver : NinjectDependencyScope, IDependencyResolver
	{
		IKernel kernel;

		public NinjectDependencyResolver(IKernel kernel)
			: base(kernel)
		{
			this.kernel = kernel;
		}

		public IDependencyScope BeginScope()
		{
			return new NinjectDependencyScope(kernel.BeginBlock());
		}
	}
}
