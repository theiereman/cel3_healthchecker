[ { name: "Demo", url: "https://demo.courtier-en-ligne.com/health_check.json" },
 { name: "DRA", url: "https://dra.courtier-en-ligne.com/health_check.json" },
 { name: "CVA", url: "https://cva.courtier-en-ligne.com/health_check.json" },
 { name: "Angelus", url: "https://angelus.courtier-en-ligne.com/health_check.json" },
 { name: "CLC", url: "https://clc.courtier-en-ligne.com/health_check.json" }
].each do |cel|
  Cel.find_or_create_by!(name: cel[:name], url: cel[:url])
end
