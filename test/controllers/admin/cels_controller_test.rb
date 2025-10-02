require "test_helper"

class Admin::CelsControllerTest < ActionDispatch::IntegrationTest
  include AuthHelper

  setup do
    @cel = cels(:healthy_cel)
  end

  test "should get index" do
    get admin_cels_url, headers: auth_headers
    assert_response :success
  end
end
