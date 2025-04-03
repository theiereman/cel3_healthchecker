require "test_helper"

class CelsControllerTest < ActionDispatch::IntegrationTest
  setup do
    @cel = cels(:one)
  end

  test "should get index" do
    get cels_url
    assert_response :success
  end

  test "should get new" do
    get new_cel_url
    assert_response :success
  end

  test "should create cel" do
    assert_difference("Cel.count") do
      post cels_url, params: { cel: { name: @cel.name, url: @cel.url } }
    end

    assert_redirected_to cel_url(Cel.last)
  end

  test "should show cel" do
    get cel_url(@cel)
    assert_response :success
  end

  test "should get edit" do
    get edit_cel_url(@cel)
    assert_response :success
  end

  test "should update cel" do
    patch cel_url(@cel), params: { cel: { name: @cel.name, url: @cel.url } }
    assert_redirected_to cel_url(@cel)
  end

  test "should destroy cel" do
    assert_difference("Cel.count", -1) do
      delete cel_url(@cel)
    end

    assert_redirected_to cels_url
  end
end
