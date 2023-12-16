require "application_system_test_case"

class ReporescuesTest < ApplicationSystemTestCase
  setup do
    @reporescue = reporescues(:one)
  end

  test "visiting the index" do
    visit reporescues_url
    assert_selector "h1", text: "Reporescues"
  end

  test "creating a Reporescue" do
    visit reporescues_url
    click_on "New Reporescue"

    fill_in "D address", with: @reporescue.d_address
    fill_in "Phone", with: @reporescue.phone
    fill_in "Pk address", with: @reporescue.pk_address
    fill_in "Repo plan", with: @reporescue.repo_plan
    fill_in "Repo time", with: @reporescue.repo_time
    fill_in "Slug", with: @reporescue.slug
    fill_in "Status", with: @reporescue.status
    fill_in "User", with: @reporescue.user_id
    fill_in "V debt", with: @reporescue.v_debt
    fill_in "V info", with: @reporescue.v_info
    fill_in "V model", with: @reporescue.v_model
    fill_in "V name", with: @reporescue.v_name
    fill_in "V type", with: @reporescue.v_type
    fill_in "Vrepoimg", with: @reporescue.vrepoimg
    click_on "Create Reporescue"

    assert_text "Reporescue was successfully created"
    click_on "Back"
  end

  test "updating a Reporescue" do
    visit reporescues_url
    click_on "Edit", match: :first

    fill_in "D address", with: @reporescue.d_address
    fill_in "Phone", with: @reporescue.phone
    fill_in "Pk address", with: @reporescue.pk_address
    fill_in "Repo plan", with: @reporescue.repo_plan
    fill_in "Repo time", with: @reporescue.repo_time
    fill_in "Slug", with: @reporescue.slug
    fill_in "Status", with: @reporescue.status
    fill_in "User", with: @reporescue.user_id
    fill_in "V debt", with: @reporescue.v_debt
    fill_in "V info", with: @reporescue.v_info
    fill_in "V model", with: @reporescue.v_model
    fill_in "V name", with: @reporescue.v_name
    fill_in "V type", with: @reporescue.v_type
    fill_in "Vrepoimg", with: @reporescue.vrepoimg
    click_on "Update Reporescue"

    assert_text "Reporescue was successfully updated"
    click_on "Back"
  end

  test "destroying a Reporescue" do
    visit reporescues_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Reporescue was successfully destroyed"
  end
end
