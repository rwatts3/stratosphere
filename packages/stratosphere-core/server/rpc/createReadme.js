Meteor.methods({
    /**
     * Create a readme file for a certain package
     * XXX how to handle behavior when package already exists catalog?
     *
     * @param versionIdentifier
     * {
     *   packageName (string) - required
     *   version (semver string) - required
     * }
     */
    createReadme: function(versionIdentifier){
        Stratosphere.schemas.VersionIdentifierSchema.clean(versionIdentifier);
        check(versionIdentifier,Stratosphere.schemas.VersionIdentifierSchema);

        Stratosphere.utils.checkAccess();

        const pack = Packages.findOne({name:versionIdentifier.packageName,private:true});
        const version = Versions.findOne({packageName:versionIdentifier.packageName,version:versionIdentifier.version});
        if(!pack || !version) throw new Meteor.Error("404","Unknown private package or version");

        const result = {uploadToken:'',url:''};

        const token = {
            type:'version',
            typeId:version._id,
            packageId:pack._id,
            paths:{readme:''},
            createdAt: new Date()
        };

        token._id = UploadTokens.insert(token);
        result.uploadToken = token._id;
        result.url = `${Meteor.settings.public.url}/upload/?token=${token._id}&type=readme`;

        console.log(`Allow publication of readme for version ${version._id}`);
        return result;
    }
});