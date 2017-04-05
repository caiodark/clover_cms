# This file is responsible for configuring your application
# and its dependencies with the aid of the Mix.Config module.
#
# This configuration file is loaded before any dependency and
# is restricted to this project.
use Mix.Config

# General application configuration
config :clover_cms,
  ecto_repos: [CloverCms.Repo]

# Configures the endpoint
config :clover_cms, CloverCms.Endpoint,
  url: [host: "localhost"],
  secret_key_base: "XSojhv9U3ZYBUYyMBceC+sfADwRF6Pbhi7M44FMbvooRBD2SLGsuH3T86A9spgGf",
  render_errors: [view: CloverCms.ErrorView, accepts: ~w(html json)],
  pubsub: [name: CloverCms.PubSub,
           adapter: Phoenix.PubSub.PG2]

# Configures Elixir's Logger
config :logger, :console,
  format: "$time $metadata[$level] $message\n",
  metadata: [:request_id]

# Configures CMS modules list
config :clover_cms,
  modules: [:languages]

# Import environment specific config. This must remain at the bottom
# of this file so it overrides the configuration defined above.
import_config "#{Mix.env}.exs"
