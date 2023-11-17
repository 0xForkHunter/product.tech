namespace :db do
  task seed: :environment do
    wallet = "0x11e92E85dcEE8af4959c3415769c2F44695B9795".downcase
    importer = User.find_or_create_by!(wallet: wallet)
    slugs = %w[
      linfo-ai
      cypher-3
      boostbot-1
    ]
    slugs.each do |slug|
      Products::Import.new(slug:, importer:).call
    end
  end
end
