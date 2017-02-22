defmodule CloverCms.Router do
  use CloverCms.Web, :router

  pipeline :browser do
    plug :accepts, ["html"]
    plug :fetch_session
    plug :fetch_flash
    plug :protect_from_forgery
    plug :put_secure_browser_headers
  end

  pipeline :api do
    plug :accepts, ["json"]
  end
  
  scope "/admin", as: :admin do
    pipe_through :browser

    get "/"    , CloverCms.Admin.AdminController, :index # Start point for the SPA
    get "/:any", CloverCms.Admin.AdminController, :index # Start point for the SPA
  end

  scope "/api/admin", as: :admin do
    pipe_through :api
    resources "/users", CloverCms.Admin.UserController
  end

  scope "/", CloverCms do
    pipe_through :browser # Use the default browser stack

    get "/", PageController, :index
  end

  # Other scopes may use custom stacks.
  # scope "/api", CloverCms do
  #   pipe_through :api
  # end
end
