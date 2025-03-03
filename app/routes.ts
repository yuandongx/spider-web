import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [

    route("login", "routes/login.tsx"),
    layout("routes/layout.tsx", [
        route("about", "routes/about.tsx"),
        route("/", "routes/main.tsx",
            [index("routes/main/index.tsx"),
            route("settings", "routes/main/settings.tsx"),
            route("profile", "routes/main/profile.tsx")
            ]
        )
    ])
] satisfies RouteConfig;
