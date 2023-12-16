require "application_system_test_case"

class ReporepairsTest < ApplicationSystemTestCase
  setup do
    @reporepair = reporepairs(:one)
  end

  test "visiting the index" do
    visit reporepairs_url
    assert_selector "h1", text: "Reporepairs"
  end

  test "creating a Reporepair" do
    visit reporepairs_url
    click_on "New Reporepair"

    fill_in "D address", with: @reporepair.d_address
    fill_in "Phone", with: @reporepair.phone
    fill_in "Pk address", with: @reporepair.pk_address
    fill_in "Slug", with: @reporepair.slug
    fill_in "Status", with: @reporepair.status
    fill_in "User", with: @reporepair.user_id
    fill_in "V info", with: @reporepair.v_info
    fill_in "V model", with: @reporepair.v_model
    fill_in "V name", with: @reporepair.v_name
    fill_in "V type", with: @reporepair.v_type
    fill_in "Vimg", with: @reporepair.vimg
    click_on "Create Reporepair"

    assert_text "Reporepair was successfully created"
    click_on "Back"
  end

  test "updating a Reporepair" do
    visit reporepairs_url
    click_on "Edit", match: :first

    fill_in "D address", with: @reporepair.d_address
    fill_in "Phone", with: @reporepair.phone
    fill_in "Pk address", with: @reporepair.pk_address
    fill_in "Slug", with: @reporepair.slug
    fill_in "Status", with: @reporepair.status
    fill_in "User", with: @reporepair.user_id
    fill_in "V info", with: @reporepair.v_info
    fill_in "V model", with: @reporepair.v_model
    fill_in "V name", with: @reporepair.v_name
    fill_in "V type", with: @reporepair.v_type
    fill_in "Vimg", with: @reporepair.vimg
    click_on "Update Reporepair"

    assert_text "Reporepair was successfully updated"
    click_on "Back"
  end

  test "destroying a Reporepair" do
    visit reporepairs_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Reporepair was successfully destroyed"
  end
end
