var fs = require("fs")

fs.readdir(__dirname + "/subjects", function (er, files) {
  if (er) throw er

  var subjects = files.map(function (file) {
    return require("./subjects/" + file)
  })

  var quals = {}

  subjects.forEach(function (subject) {
    subject.qualifications.forEach(function (qual) {
      var qualKey = qual.toLowerCase()
      quals[qualKey] = quals[qualKey] || {name: qual, subjects: []}
      quals[qualKey].subjects.push(subject.name)
    })
  })

  var qualsList = Object.keys(quals).map(function (qualKey) {
    return quals[qualKey]
  })

  console.log(JSON.stringify(qualsList, null, 2))
})