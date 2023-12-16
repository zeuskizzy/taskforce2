require "application_system_test_case"

class WelcomesTest < ApplicationSystemTestCase
  setup do
    @welcome = welcomes(:one)
  end

  test "visiting the index" do
    visit welcomes_url
    assert_selector "h1", text: "Welcomes"
  end

  test "creating a Welcome" do
    visit welcomes_url
    click_on "New Welcome"

    fill_in "Address", with: @welcome.address
    fill_in "Desc", with: @welcome.desc
    fill_in "Email", with: @welcome.email
    fill_in "Footer", with: @welcome.footer
    fill_in "Ig", with: @welcome.ig
    fill_in "Link", with: @welcome.link
    fill_in "Ln", with: @welcome.ln
    fill_in "Logoimg", with: @welcome.logoimg
    fill_in "Phone", with: @welcome.phone
    fill_in "Section", with: @welcome.section
    fill_in "Telegram", with: @welcome.telegram
    fill_in "Title", with: @welcome.title
    fill_in "Twitter", with: @welcome.twitter
    fill_in "Whatsapp", with: @welcome.whatsapp
    fill_in "Youtube", with: @welcome.youtube
    click_on "Create Welcome"

    assert_text "Welcome was successfully created"
    click_on "Back"
  end

  test "updating a Welcome" do
    visit welcomes_url
    click_on "Edit", match: :first

    fill_in "Address", with: @welcome.address
    fill_in "Desc", with: @welcome.desc
    fill_in "Email", with: @welcome.email
    fill_in "Footer", with: @welcome.footer
    fill_in "Ig", with: @welcome.ig
    fill_in "Link", with: @welcome.link
    fill_in "Ln", with: @welcome.ln
    fill_in "Logoimg", with: @welcome.logoimg
    fill_in "Phone", with: @welcome.phone
    fill_in "Section", with: @welcome.section
    fill_in "Telegram", with: @welcome.telegram
    fill_in "Title", with: @welcome.title
    fill_in "Twitter", with: @welcome.twitter
    fill_in "Whatsapp", with: @welcome.whatsapp
    fill_in "Youtube", with: @welcome.youtube
    click_on "Update Welcome"

    assert_text "Welcome was successfully updated"
    click_on "Back"
  end

  test "destroying a Welcome" do
    visit welcomes_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Welcome was successfully destroyed"
  end
end
