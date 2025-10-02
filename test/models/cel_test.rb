require "test_helper"

class CelTest < ActiveSupport::TestCase
  setup do
    @healthy_cel = cels(:healthy_cel)
    @unhealthy_cel = cels(:unhealthy_cel)

    api_responses = YAML.load_file(Rails.root.join('test/support/healthcheck_api_response.yml')).deep_symbolize_keys
    @healthy_response = api_responses[:healthy]
    @unhealthy_response = api_responses[:unhealthy]

    stub_request(:get, @healthy_cel.url).to_return(status: 200, body: @healthy_response[:data])
    stub_request(:get, @unhealthy_cel.url).to_return(status: 200, body: @unhealthy_response[:data])
  end

  test "healthy cel returns healthy response" do
    @healthy_cel.check_health
    assert @healthy_cel.healthy?
    assert_equal "success", @healthy_cel.message
  end

  test "unhealthy cel returns unhealthy response" do
    @unhealthy_cel.check_health
    assert_equal false, @unhealthy_cel.healthy?
    assert @unhealthy_cel.unhealthy?
    assert_equal "ged: disabled until 2025-10-02 07:09:11 UTC", @unhealthy_cel.message
    assert_equal false, @unhealthy_cel.ged.healthy
  end
end
