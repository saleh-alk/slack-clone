class StaticPagesController < ActionController::Base
  def frontend
    # render file: Rails.root.join('frontend/public', 'index.html')
    render file: Rails.root.join('public', 'index.html')
  end
end