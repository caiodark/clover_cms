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
    plug :fetch_session
  end

  pipeline :api_authenticated do
    plug :accepts, ["json"]
    plug :fetch_session
    plug :fetch_flash
    plug CloverCms.Plug.Authenticated
  end
  
  scope "/admin", as: :admin do
    pipe_through :browser

    get "/"    , CloverCms.Admin.AdminController, :index # Start point for the SPA
  end

  scope "/api/admin/users", as: :admin do
    pipe_through :api
    post "/authenticate", CloverCms.Admin.UserController, :authenticate
    get  "/session"     , CloverCms.Admin.UserController, :session
    get  "/logout"      , CloverCms.Admin.UserController, :logout
  end
 
  scope "/api/admin", as: :admin do
    pipe_through :api_authenticated
    resources "/users", CloverCms.Admin.UserController
    resources "/forms", CloverCms.Admin.FormController
    resources "/languages", CloverCms.Admin.LanguageController
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
