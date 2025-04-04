require "net/http"

module HealthCheck
  class HealthCheckService
    def self.check(url)
      uri = URI(url)
      res = Net::HTTP.get_response uri
      res.body
    end
  end
end
