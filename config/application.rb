require_relative "boot"

require "rails/all"

# Require the gems listed in Gemfile, including any gems
# you've limited to :test, :development, or :production.
Bundler.require(*Rails.groups)

module Cel3Healthchecker
  class Application < Rails::Application
    config.load_defaults 8.0
    config.autoload_lib(ignore: %w[assets tasks])
    config.autoload_paths += %W[#{config.root}/app/services]
  end
end
