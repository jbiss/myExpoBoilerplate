export default {
  name: 'featured',
  title: 'Featured menu categories',
  type: 'document',
  fields: [
    {
      name: 'name',
      type: 'string',
      title: 'Featured category name',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'short_description',
      type: 'string',
      title: 'Short description',
      validation: (Rule) => Rule.required(),
    },
    {
      name: 'restuarants',
      type: 'array',
      title: 'Restuarants',
      of: [{type: "reference", to: [{type: "restuarant"}]}],
    },
  ],
}
