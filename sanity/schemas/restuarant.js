export default {
  name: 'restuarant',
  title: 'Resturant',
  type: 'document',
  fields: [
    {
      name: "name",
      type: "string",
      title: "Restuarant name",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "short_description",
      type: "string",
      title: "Short description",
      validation: (Rule) => Rule.max(200),
    },
    {
      name: "image",
      type: "image",
      title: "image of the Restuarant",
    },
    {
      name: "lat",
      type: "number",
      title: "lattitude of the Restuarant",
    },
    {
      name: "long",
      type: "number",
      title: "longtitude of the Restuarant",
    },
    {
      name: "address",
      type: "string",
      title: "Restuarant address",
      validation: (Rule) => Rule.required(),
    },
    {
      name: "rating",
      type: "number",
      title: "enter a rating from (1 to 5 stars)",
      validation: (Rule) => Rule.required()
        .min(1)
        .max(5)
        .error("Please enter a value from 1 to 5")
      ,
    },
    {
      name: "type",
      title: "Category",
      validation: (Rule) => Rule.required(),
      type: "reference",
      to: [{type: "category"}]
    },
    {
      name: "dishes",
      type: "array",
      title: "Dishes",
      of: [{type: "reference", to: [{type: "dish"}]}]
    }
  ],

}
