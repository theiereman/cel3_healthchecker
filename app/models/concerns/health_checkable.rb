module HealthCheckable
  extend ActiveSupport::Concern

  included do
    def check_health
      res = HealthCheck::HealthCheckService.check(url)
      define_singleton_method(:status) { res.success? ? "ok" : "error" }
    end
  end
end
