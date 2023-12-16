require "application_system_test_case"

class HeadersTest < ApplicationSystemTestCase
  setup do
    @header = headers(:one)
  end

  test "visiting the index" do
    visit headers_url
    assert_selector "h1", text: "Headers"
  end

  test "creating a Header" do
    visit headers_url
    click_on "New Header"

    fill_in "Abouts sub title", with: @header.abouts_sub_title
    fill_in "Abouts title", with: @header.abouts_title
    fill_in "Blogs sub title", with: @header.blogs_sub_title
    fill_in "Blogs title", with: @header.blogs_title
    fill_in "Boards sub title", with: @header.boards_sub_title
    fill_in "Boards title", with: @header.boards_title
    fill_in "Cta1", with: @header.cta1
    fill_in "Cta2", with: @header.cta2
    fill_in "Features sub title", with: @header.features_sub_title
    fill_in "Features title", with: @header.features_title
    fill_in "Feedbacks sub title", with: @header.feedbacks_sub_title
    fill_in "Feedbacks title", with: @header.feedbacks_title
    fill_in "Headerimg", with: @header.headerimg
    fill_in "Products sub title", with: @header.products_sub_title
    fill_in "Products title", with: @header.products_title
    fill_in "Projects sub title", with: @header.projects_sub_title
    fill_in "Projects title", with: @header.projects_title
    fill_in "Services sub title", with: @header.services_sub_title
    fill_in "Services title", with: @header.services_title
    click_on "Create Header"

    assert_text "Header was successfully created"
    click_on "Back"
  end

  test "updating a Header" do
    visit headers_url
    click_on "Edit", match: :first

    fill_in "Abouts sub title", with: @header.abouts_sub_title
    fill_in "Abouts title", with: @header.abouts_title
    fill_in "Blogs sub title", with: @header.blogs_sub_title
    fill_in "Blogs title", with: @header.blogs_title
    fill_in "Boards sub title", with: @header.boards_sub_title
    fill_in "Boards title", with: @header.boards_title
    fill_in "Cta1", with: @header.cta1
    fill_in "Cta2", with: @header.cta2
    fill_in "Features sub title", with: @header.features_sub_title
    fill_in "Features title", with: @header.features_title
    fill_in "Feedbacks sub title", with: @header.feedbacks_sub_title
    fill_in "Feedbacks title", with: @header.feedbacks_title
    fill_in "Headerimg", with: @header.headerimg
    fill_in "Products sub title", with: @header.products_sub_title
    fill_in "Products title", with: @header.products_title
    fill_in "Projects sub title", with: @header.projects_sub_title
    fill_in "Projects title", with: @header.projects_title
    fill_in "Services sub title", with: @header.services_sub_title
    fill_in "Services title", with: @header.services_title
    click_on "Update Header"

    assert_text "Header was successfully updated"
    click_on "Back"
  end

  test "destroying a Header" do
    visit headers_url
    page.accept_confirm do
      click_on "Destroy", match: :first
    end

    assert_text "Header was successfully destroyed"
  end
end
