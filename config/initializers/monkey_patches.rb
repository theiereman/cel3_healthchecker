Dir[Rails.root.join('lib', 'core_ext/*', '*.rb')].each { |f| require f }

Hash.include CoreExt::Hash