import { sql } from "@vercel/postgres";

export default async function handler(req, res) {
  console.log("Hit filteredProperties -> body", req.body)
  try {
    const {
      amenities,
      filters,
      preferences,
      minArea,
      maxArea,
      minPrice,
      maxPrice,
      city,
      searchInput,
      page
    } = req.body;
    const searchInput1 = searchInput ? searchInput : "";
    // console.log("search input in filter",searchInput)
    const bhk = filters.bhk;
    const prop = filters.property;
    const status = filters.status;
    // const furn = filters.furnish;
    const sale = filters.sale;
    let tags;
    tags = preferences.filter((preference) => {
      return preference != null && preference != "";
    });
    // const amenity_list = amenities.length == 0 ? ["all amenities"] : amenities;
    tags = tags.length === 0 ? ['near airport', 'near metro', 'near top schools', 'ev friendly', 'eco friendly', 'luxury', 'popular hubs'] : tags;
    const convertToLac = (price) => {
      if (price.includes("Lac")) {
        return parseFloat(price.replace(" Lac", ""));
      } else if (price.includes("Cr")) {
        return parseFloat(price.replace(" Cr", "")) * 100; // Convert Cr to Lac
      } else {
        return 'NaN';
      }
      // Handle other formats or invalid inputs here
    };

    const minPriceInLac = convertToLac(minPrice);
    const maxPriceInLac = convertToLac(maxPrice);
    const min_Area = parseFloat(minArea);
    const max_Area = parseFloat(maxArea);
    // Execute the query and fetch the data from the database
    // const result=await sql`${log}`;
    const result = await sql`
      SELECT * FROM property_details AS tp
      WHERE (${minPriceInLac}='NaN' OR tp.minprice >= ${minPriceInLac})
      AND (${maxPriceInLac}='NaN' OR tp.maxprice <= ${maxPriceInLac})
      AND (${min_Area}='NaN' OR tp.minArea >= ${min_Area})
      AND (${max_Area}='NaN' OR tp.maxArea <= ${max_Area})
      AND (
        ${bhk}='' OR
        (${bhk} = '2' AND tp.bhk_count LIKE '%2%')
          OR
        (${bhk} = '3' AND tp.bhk_count LIKE '%3%')
        OR
        (${bhk} = '4' AND tp.bhk_count LIKE '%4%')
      )
      AND (
        ${prop}='' OR
        (${prop} = 'Apartment' AND tp.configuration LIKE '%Flat%')
          OR
        (${prop} = 'Villa' AND tp.configuration LIKE '%Villa%')
        OR
        (${prop} = 'Builder Floor' AND tp.configuration LIKE '%Ind%')
        OR
        (${prop} = 'Plot' AND tp.configuration LIKE '%Plot%')
        OR
        (${prop} = 'Studio' AND tp.configuration LIKE '%Studio%')
        OR
        (${prop} = 'Penthouse' AND tp.configuration LIKE '%Penthouse%')
      )
      AND (
        ${status}='' OR
        (${status} = 'Under Construction' AND tp.status LIKE '%Construction%')
          OR
        (${status} = 'Ready to Move' AND (tp.status LIKE '%Ready%' OR tp.status LIKE '%Well%'))
        OR
        (${status} = 'New Launch' AND tp.status LIKE '%New%')
        OR
        (${status} = 'Near Possession' AND tp.status LIKE '%Near%')
      )
      AND tp.maxprice IS NOT NULL
      AND tp.maxArea IS NOT NULL
      AND tp.city = ${city}
      AND (${searchInput}='' OR ${searchInput1}='' OR (tp.property_name ILIKE ${'%' + searchInput + '%'} OR tp.location ILIKE ${'%' + searchInput + '%'} OR tp.builder_details->>'name' ILIKE ${'%' + searchInput + '%'}))
      AND tags && ${tags}
      ORDER BY tp.id ASC
      LIMIT 10
      OFFSET ${(page - 1) * 10};

  `;

    const count_query = await sql`SELECT COUNT(*) FROM property_details AS tp
      WHERE (${minPriceInLac}='NaN' OR tp.minprice >= ${minPriceInLac})
      AND (${maxPriceInLac}='NaN' OR tp.maxprice <= ${maxPriceInLac})
      AND (${min_Area}='NaN' OR tp.minArea >= ${min_Area})
      AND (${max_Area}='NaN' OR tp.maxArea <= ${max_Area})
      AND (
        ${bhk}='' OR
        (${bhk} = '2' AND tp.bhk_count LIKE '%2%')
          OR
        (${bhk} = '3' AND tp.bhk_count LIKE '%3%')
        OR
        (${bhk} = '4' AND tp.bhk_count LIKE '%4%')
      )
      AND (
        ${prop}='' OR
        (${prop} = 'Apartment' AND tp.configuration LIKE '%Flat%')
          OR
        (${prop} = 'Villa' AND tp.configuration LIKE '%Villa%')
        OR
        (${prop} = 'Builder Floor' AND tp.configuration LIKE '%Ind%')
        OR
        (${prop} = 'Plot' AND tp.configuration LIKE '%Plot%')
        OR
        (${prop} = 'Studio' AND tp.configuration LIKE '%Studio%')
        OR
        (${prop} = 'Penthouse' AND tp.configuration LIKE '%Penthouse%')
      )
      AND (
        ${status}='' OR
        (${status} = 'Under Construction' AND tp.status LIKE '%Construction%')
          OR
        (${status} = 'Ready to Move' AND (tp.status LIKE '%Ready%' OR tp.status LIKE '%Well%'))
        OR
        (${status} = 'New Launch' AND tp.status LIKE '%New%')
        OR
        (${status} = 'Near Possession' AND tp.status LIKE '%Near%')
      )
      AND tp.maxprice IS NOT NULL
      AND tp.maxArea IS NOT NULL
      AND tp.city = ${city}
      AND (${searchInput}='' OR ${searchInput1}='' OR (tp.property_name ILIKE ${'%' + searchInput + '%'} OR tp.location ILIKE ${'%' + searchInput + '%'} OR tp.builder_details->>'name' ILIKE ${'%' + searchInput + '%'}))
      AND tags && ${tags};
  `
    const originalData = result.rows;
    console.log("original data",originalData.length);
    const count = count_query.rows[0].count;
    const newDataArray = originalData.map((item) => {
      const propertysize = item.propertysize || [];
      const [unitCount, landSize] = propertysize;
      return {
        id: item.id,
        img: item.thumbnail,
        property_name: item.property_name,
        address: item.location,
        range: item.price_range,
        minprice: item.minprice,
        maxprice: item.maxprice,
        status: item.status,
        unitCount: unitCount || "",
        landSize: landSize || "",
        configuration: item.configuration,
        builder_name: item.builder_details?.name || "",
        builder_experience: item.builder_details?.experience || "",
        builder_img: item.builder_details?.img || "",
        builder_desc: item.builder_details?.desc || "",
        sports: item.sports_amenities,
        leisure: item.leisure_emenities,
        convenience: item.convenience_emenities,
        safety: item.safety_emenities,
        env: item.environment_emenities,
        airport: item.airpot_distance,
        metro: parseFloat(item.metro_distance?.dist),
        school: parseFloat(item.school?.rate),
        tags: item.tags,
        minArea: item.minarea,
        maxArea: item.maxarea
      };
    });
    // console.log(result)

    // Define a function to convert preference values to numeric values
    const convertPreferenceToNumeric = (preference) => {
      const numericValues = {
        "Near Airport": 15, // Assuming 15 is the maximum distance considered "near"
        "Near Top Schools": 4, // Numeric value corresponding to the school type
        "Near Metro Station": 15, // Numeric value corresponding to the metro distance
      };

      return numericValues[preference] || preference; // If not found, return the original preference
    };
    const mapAmenityToGeneralTerm = (amenity) => {
      // Define a mapping for specific amenities to general terms
      const amenityMappings = {
        "Kids Play Area": "Kids Play Areas / Sand Pits",
        Garden: "Large Green Area",
        "Sports Court": [
          "Badminton Court(s)",
          "Tennis Court(s)",
          "Squash Court",
          "Cricket",
        ],
        // Add more mappings as needed
      };

      return amenityMappings[amenity] || amenity;
    };
    const filteredData =
      amenities.length === 0
        ? newDataArray
        : newDataArray.filter((property) => {
          // Check if any amenity is present in any of the 5 arrays
          return amenities.every((amenity) => {
            const adjustedAmenity = mapAmenityToGeneralTerm(amenity);
            return (
              property.sports?.some((courtType) =>
                adjustedAmenity.includes(courtType)
              ) ||
              property.leisure?.includes(adjustedAmenity) ||
              property.convenience?.includes(adjustedAmenity) ||
              property.safety?.includes(adjustedAmenity) ||
              property.env?.includes(adjustedAmenity)
            );
          });
        });

    //console.log(filteredData);
    res.status(200).json({ data: filteredData, count });
  } catch (error) {
    console.error("Error handling request:", error);
    res.status(500).json({ error: "An error occurred" });
  }
}
//AND Sports_amenities @> ARRAY ${amenities}
