namespace :item do 
  desc "create dummies items"
  task create_dummies: :environment do 
    100.times do
      x=Product.last.id.to_i+1p=Product.create(brand_id:2, product_name:"dummy"+x.to_s, images:["https://www.rhythmsnowsports.com.au/cdn/shop/files/106881100PrimaryHighRes_2048x2048.jpg?v=1711064575"])
      5.times do 
        i=Item.create(product:p, spec: (140+rand(20)).to_s+"cm", 
          available_from: Time.now, available_to: Time.now+(100+rand(10)).days, available:true)
        1.times do  
          starts= Time.now+(-10+rand(20)).days
          ends= starts+(10+rand(10)).days
          LeaseRecord.create(item:i, date_from: starts, date_to: ends)
        end
      end
    end
  end  
end 