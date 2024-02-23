# -*- encoding: utf-8 -*-
# stub: route_mechanic 0.2.1 ruby lib

Gem::Specification.new do |s|
  s.name = "route_mechanic".freeze
  s.version = "0.2.1"

  s.required_rubygems_version = Gem::Requirement.new(">= 0".freeze) if s.respond_to? :required_rubygems_version=
  s.metadata = { "homepage_uri" => "https://github.com/ohbarye/route_mechanic", "source_code_uri" => "https://github.com/ohbarye/route_mechanic" } if s.respond_to? :metadata=
  s.require_paths = ["lib".freeze]
  s.authors = ["ohbarye".freeze]
  s.bindir = "exe".freeze
  s.date = "2021-01-11"
  s.description = "No need to maintain Rails' routing tests manually. RouteMechanic automatically detects broken routes and missing action methods in controller once you've finished installation.".freeze
  s.email = ["over.rye@gmail.com".freeze]
  s.homepage = "https://github.com/ohbarye/route_mechanic".freeze
  s.licenses = ["MIT".freeze]
  s.required_ruby_version = Gem::Requirement.new(">= 2.4.0".freeze)
  s.rubygems_version = "3.2.3".freeze
  s.summary = "RouteMechanic detects broken routes with ease".freeze

  s.installed_by_version = "3.2.3" if s.respond_to? :installed_by_version

  if s.respond_to? :specification_version then
    s.specification_version = 4
  end

  if s.respond_to? :add_runtime_dependency then
    s.add_runtime_dependency(%q<actionpack>.freeze, [">= 4.2", "< 6.2"])
    s.add_runtime_dependency(%q<regexp-examples>.freeze, [">= 1.5", "< 2"])
  else
    s.add_dependency(%q<actionpack>.freeze, [">= 4.2", "< 6.2"])
    s.add_dependency(%q<regexp-examples>.freeze, [">= 1.5", "< 2"])
  end
end
