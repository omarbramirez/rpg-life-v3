exports.filterUpdateField = (body, allowedFields) => {
    const updateField = {}
    for(const key of allowedFields){
        if (body[key] !== undefined && body[key] !== 'new_title') {
            updateField[key] = body[key];
          }
          updateField['title'] = body.new_title
    }
    return updateField
}