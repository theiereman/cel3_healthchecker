# frozen_string_literal: true

module HealthCheck
  class Reponse < Data.define(:body, :status)
    HTTP_SUCCESS_STATUS_CODES = (200..299)

    def success?    = HTTP_SUCCESS_STATUS_CODES.include?(status)
    def parsed_body = JSON.parse(body, symbolize_names: true)
    def failed?     = !success?
  end
end
