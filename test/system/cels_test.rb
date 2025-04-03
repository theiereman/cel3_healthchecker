require "application_system_test_case"

class CelsTest < ApplicationSystemTestCase
  setup do
    @cel = cels(:one)
  end

  test "visiting the index" do
    visit cels_url
    assert_selector "h1", text: "Cels"
  end

  test "should create cel" do
    visit cels_url
    click_on "New cel"

    fill_in "Name", with: @cel.name
    fill_in "Url", with: @cel.url
    click_on "Create Cel"

    assert_text "Cel was successfully created"
    click_on "Back"
  end

  test "should update Cel" do
    visit cel_url(@cel)
    click_on "Edit this cel", match: :first

    fill_in "Name", with: @cel.name
    fill_in "Url", with: @cel.url
    click_on "Update Cel"

    assert_text "Cel was successfully updated"
    click_on "Back"
  end

  test "should destroy Cel" do
    visit cel_url(@cel)
    click_on "Destroy this cel", match: :first

    assert_text "Cel was successfully destroyed"
  end
end
