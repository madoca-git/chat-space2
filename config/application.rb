require_relative 'boot'

require 'rails/all'

Bundler.require(*Rails.groups)

module ChatSpace2
  class Application < Rails::Application
    config.load_defaults 6.0
    config.generators do |g|
      g.stylesheets false
      g.javascripts false
      g.helper false
      g.test_framework false
      config.i18n.default_locale = :ja
    end
    
    config.action_view.field_error_proc = Proc.new do |html_tag, instance| 
      html_tag
    end

  end
end
