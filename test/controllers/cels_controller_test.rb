require "test_helper"

class CelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cel = cels(:healthy_cel)
  end

  test "should get index" do
    get cels_url
    assert_response :success
  end
end
