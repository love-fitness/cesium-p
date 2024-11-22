let routes = [
	{
		path: "/",
		name: "home",
		component: () => import("@/views/home/index.vue"),
	},
];

export default routes;